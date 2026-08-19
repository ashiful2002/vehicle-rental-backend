import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const originalName = file.originalname;

    const extension = originalName.split('.').pop()?.toLowerCase();
    const fileNameWithoutExtenction = originalName
      .split('')
      .slice(0, 1)
      .join()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '');
    const uniqueName =
      Math.random().toString(36).substring(2, 8) +
      '-' +
      Date.now() +
      fileNameWithoutExtenction;

    const folder = extension === 'pdf' ? 'pdfs' : 'images';
    return {
      folder: `Vehicle-management/${folder}`,
      public_id: uniqueName,
      resource_type: 'auto',
    };
  },
});

export const multerUpload = multer({ storage });
