import React, { useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UploadButton = styled(Button)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '12px 20px',
  width: '100%',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#f8f9fa',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: '#e9ecef',
  }
}));

const SuccessBox = styled(Box)(({ theme }) => ({
  border: '1px solid #4caf50',
  borderRadius: '8px',
  padding: '12px 20px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#e8f5e9',
  color: '#2e7d32',
}));

const FileUploadButton = ({ onFileUpload, fileName }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        onFileUpload(file);
        setUploading(false);
      }, 1000); // Simulate upload delay
    }
  };

  if (fileName) {
    return (
      <SuccessBox>
        <CheckCircleIcon color="success" />
        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
          {fileName}
        </Typography>
      </SuccessBox>
    );
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <UploadButton 
        onClick={handleButtonClick}
        disabled={uploading}
      >
        <CloudUploadIcon />
        <Typography variant="body2">
          {uploading ? 'Uploading...' : 'Upload'}
        </Typography>
      </UploadButton>
    </>
  );
};

export default FileUploadButton;
