import cloudinary from './cloudinary';

/**
 * Upload file to Cloudinary
 * @param {string} fileBuffer - Base64 encoded file or file buffer
 * @param {string} folder - Cloudinary folder name
 * @param {string} publicId - Optional custom public ID
 * @returns {Promise<Object>} Upload result with url and public_id
 */
export async function uploadToCloudinary(fileBuffer, folder = 'id-documents', publicId = null) {
  try {
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      transformation: [
        { quality: 'auto' }, // Automatic quality optimization
        { fetch_format: 'auto' } // Automatic format selection
      ]
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await cloudinary.uploader.upload(fileBuffer, uploadOptions);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
      createdAt: result.created_at
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Public ID of the file to delete
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
}

/**
 * Update file in Cloudinary (delete old, upload new)
 * @param {string} oldPublicId - Public ID of file to replace
 * @param {string} newFileBuffer - New file buffer
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<Object>} Upload result
 */
export async function updateInCloudinary(oldPublicId, newFileBuffer, folder = 'id-documents') {
  try {
    // Delete old file
    if (oldPublicId) {
      await deleteFromCloudinary(oldPublicId);
    }
    
    // Upload new file
    return await uploadToCloudinary(newFileBuffer, folder);
  } catch (error) {
    console.error('Cloudinary update error:', error);
    throw new Error('Failed to update file in Cloudinary');
  }
}
