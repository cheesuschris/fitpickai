import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OutfitStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'In rotation' ? (
        <>
          In rotation
          <CheckCircleIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Out of rotation' ? (
        <>
          Out of rotation
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
