const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const accountName = process.env.AZURE_accountname;
const accountKey = process.env.AZURE_accountKey;
const containerName = process.env.AZURE_ContainerName;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

const uploadFileToAzure = async (fileData, contentType) => {
  try {
    // Extract base64 data
    const base64Data = fileData.split(';base64,').pop();
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Generate a unique filename
    const filename = `${Date.now()}_${Math.floor(Math.random() * 10000)}.${contentType.split('/')[1]}`;

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Create a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    
    // Upload data to the blob
    await blockBlobClient.upload(buffer, buffer.length, { blobHTTPHeaders: { blobContentType: contentType } });
    
    // Return the URL of the uploaded file
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading file to Azure:', error);
    throw new Error('Failed to upload file to Azure');
  }
};

module.exports = { uploadFileToAzure };
