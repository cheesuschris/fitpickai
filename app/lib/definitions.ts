export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Outfit = {
    id: string;
    user_id: string; // Foreign Key
    name?: string;
    shirt_image_url: string;
    pants_image_url: string;
    //Socks will be plain white
    shoes_image_url: string;
    hat_accessory_image_url?: string;
    glasses_accessory_image_url?: string;
    ear_piercings_accessory_image_url?: string;
    neck_accessory_image_url?: string;
    wrist_accessory_image_url?: string;
    pants_accessory_image_url?: string;
    bag_accessory_image_url?: string;
    rotation_status: boolean;
    personal_rating: number;
    date: string;
};

export type PersonalRatingsTrend = {
    id: string;
    outfit_id: string; //Foreign Key
    ratings: {
        user_id: string; //Foreign Key
        rating: number;
        date: string;
    }[];
};

export type ViewerOutfit = Omit<Outfit, 'personal_rating'>;

export type UserField = {
    id: string;
    name: string;
};