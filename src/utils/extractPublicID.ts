function extractPublicId(url: string): string {
  // Split the URL into parts using '/' as the delimiter
  const parts = url.split('/');

  // Find the index of the 'upload' part which comes before the public ID
  const uploadIndex = parts.indexOf('upload');

  // Get the parts after 'upload', joining them into a path string
  const publicIdParts = parts.slice(uploadIndex + 2); // Skipping 'v1726482096'
  
  // Join the parts back together and remove the file extension
  const publicIdWithExtension = publicIdParts.join('/');

  // Remove the file extension to get the public ID
  const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

  return publicId;
}
export default extractPublicId