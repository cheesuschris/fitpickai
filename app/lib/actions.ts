"use server";
import postgres from "postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {signIn, auth} from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require"
});

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    date: z.string(),
    name: z.string().optional(),
    shirtImageUrl: z.string({invalid_type_error: "Please choose your shirt."}),
    pantsImageUrl: z.string({invalid_type_error: "Please choose your pants or shorts."}),
    shoesImageUrl: z.string({invalid_type_error: "Please choose your shoes."}),
    hatAccessoryImageUrl: z.string().optional(),
    glassesAccessoryImageUrl: z.string().optional(),
    earPiercingsAccessoryImageUrl: z.string().optional(),
    neckAccessoryImageUrl: z.string().optional(),
    wristAccessoryImageUrl: z.string().optional(),
    pantsAccessoryImageUrl: z.string().optional(),
    bagAccessoryImageUrl: z.string().optional(),
    personalRating: z.coerce.number().min(0).max(10, { message: "Please enter a rating between 1 and 10." }),
    rotationStatus: z.enum(["In rotation", "Out of rotation"], { invalid_type_error: "Please select this outfit's rotation status."}),
});

const CreateOutfit = FormSchema.omit({id: true, userId: true, date: true});
const UpdateOutfit = FormSchema.omit({id: true, userId: true, date: true});

export type State = {
    errors?: {
        userId?: string[];
        personalRating?: string[];
        rotationStatus?: string[];
    };
    message?: string | null;
};

export async function createOutfit(prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("You must be logged in to create an outfit.");
    }
    const userId = session.user.id;
    const validatedFields = CreateOutfit.safeParse({
        name: formData.get("name"),
        shirtImageUrl: formData.get("shirtImageUrl"),
        pantsImageUrl: formData.get("pantsImageUrl"),
        shoesImageUrl: formData.get("shoesImageUrl"),
        hatAccessoryImageUrl: formData.get("hatAccessoryImageUrl"),
        glassesAccessoryImageUrl: formData.get("glassesAccessoryImageUrl"),
        earPiercingsAccessoryImageUrl: formData.get("earPiercingsAccessoryImageUrl"),
        neckAccessoryImageUrl: formData.get("neckAccessoryImageUrl"),
        wristAccessoryImageUrl: formData.get("wristAccessoryImageUrl"),
        pantsAccessoryImageUrl: formData.get("pantsAccessoryImageUrl"),
        bagAccessoryImageUrl: formData.get("bagAccessoryImageUrl"),
        personalRating: formData.get("personalRating"),
        rotationStatus: formData.get("rotationStatus")
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to create outfit."
        };
    }
    const {name, shirtImageUrl, pantsImageUrl, shoesImageUrl, hatAccessoryImageUrl, glassesAccessoryImageUrl, earPiercingsAccessoryImageUrl, neckAccessoryImageUrl, wristAccessoryImageUrl, pantsAccessoryImageUrl, bagAccessoryImageUrl, personalRating, rotationStatus} = validatedFields.data;
    const date = new Date().toISOString().split("T")[0];
    try {
        await sql`
            INSERT INTO outfits (user_id, date, name, shirt_image_url, pants_image_url, shoes_image_url, hat_accessory_image_url, glasses_accessory_image_url, ear_piercings_accessory_image_url, neck_accessory_image_url, wrist_accessory_image_url, pants_accessory_image_url, bag_accessory_image_url, personal_rating, rotation_status)
            VALUES (${userId}, ${date}, ${name}, ${shirtImageUrl}, ${pantsImageUrl}, ${shoesImageUrl}, ${hatAccessoryImageUrl ?? null}, ${glassesAccessoryImageUrl ?? null}, ${earPiercingsAccessoryImageUrl ?? null}, ${neckAccessoryImageUrl ?? null}, ${wristAccessoryImageUrl ?? null}, ${pantsAccessoryImageUrl ?? null}, ${bagAccessoryImageUrl ?? null}, ${personalRating}, ${rotationStatus})
        `;
    } catch (error) {
        console.error(error);
    }
    revalidatePath("/dashboard/outfits");
    redirect("/dashboard/outfits");
}

export async function updateOutfit(id: string, prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("You must be logged in to update an outfit.");
    }
    const userId = session.user.id;
    const validatedFields = UpdateOutfit.safeParse({
        name: formData.get("name"),
        shirtImageUrl: formData.get("shirtImageUrl"),
        pantsImageUrl: formData.get("pantsImageUrl"),
        shoesImageUrl: formData.get("shoesImageUrl"),
        hatAccessoryImageUrl: formData.get("hatAccessoryImageUrl"),
        glassesAccessoryImageUrl: formData.get("glassesAccessoryImageUrl"),
        earPiercingsAccessoryImageUrl: formData.get("earPiercingsAccessoryImageUrl"),
        neckAccessoryImageUrl: formData.get("neckAccessoryImageUrl"),
        wristAccessoryImageUrl: formData.get("wristAccessoryImageUrl"),
        pantsAccessoryImageUrl: formData.get("pantsAccessoryImageUrl"),
        bagAccessoryImageUrl: formData.get("bagAccessoryImageUrl"),
        personalRating: formData.get("personalRating"),
        rotationStatus: formData.get("rotationStatus")
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to create outfit."
        };
    }
    const {name, shirtImageUrl, pantsImageUrl, shoesImageUrl, hatAccessoryImageUrl, glassesAccessoryImageUrl, earPiercingsAccessoryImageUrl, neckAccessoryImageUrl, wristAccessoryImageUrl, pantsAccessoryImageUrl, bagAccessoryImageUrl, personalRating, rotationStatus} = validatedFields.data;
    const date = new Date().toISOString().split("T")[0];
    try {
        await sql`
            UPDATE outfits
            SET name = ${name}, shirt_image_url = ${shirtImageUrl}, pants_image_url = ${pantsImageUrl}, shoes_image_url = ${shoesImageUrl}, hat_accessory_image_url = ${hatAccessoryImageUrl}, glasses_accessory_image_url = ${glassesAccessoryImageUrl}, ear_piercings_accessory_image_url = ${earPiercingsAccessoryImageUrl}, neck_accessory_image_url = ${neckAccessoryImageUrl}, wrist_accessory_image_url = ${wristAccessoryImageUrl}, pants_accessory_image_url = ${pantsAccessoryImageUrl}, bag_accessory_image_url = ${bagAccessoryImageUrl}, personal_rating = ${personalRating}, rotation_status = ${rotationStatus}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/dashboard/outfits");
    redirect("/dashboard/outfits");
}

export async function deleteOutfit(id: string) {
    await sql`DELETE FROM outfits WHERE id = ${id}`;
    revalidatePath("/dashboard/outfits");
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}