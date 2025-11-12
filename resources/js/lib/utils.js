import { router } from '@inertiajs/react';
import { clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function flashMessage(params) {
    return params.props.flash_message;
}

export const deleteAction = (url, { closeModal, ...options } = {}) => {
    const defaultOptions = {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (success) => {
            const flash = flashMessage(success);

            if (flash) {
                toast[flash.type](flash.message);
            }

            if (closeModal && typeof closeModal === 'function') {
                closeModal();
            }
        },

        ...options,
    };

    router.delete(url, defaultOptions);
};

export const formatDateIndo = (dateString) => {
    if (!dateString) {
        return 'Belum ada tanggal';
    }
    return format(parseISO(dateString), 'eee, dd MMM yyyy', { locale: id });
};

export const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};
