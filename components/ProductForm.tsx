import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

interface ProductFormProps {
  _id?: string;
  name?: string;
  description?: string;
  price?: string;
  images?: string[];
}
const ProductForm: React.FC<ProductFormProps> = ({
  _id,
  name: exitingName,
  description: existingDescription,
  price: existingPrice,
  images,
}) => {
  const [name, setName] = useState(exitingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    const data = { name, description, price };

    try {
      if (_id) {
        // UPDATE PRODUCT
        await axios.patch(`/api/products/${_id}`, data);
      } else {
        // CREATE PRODUCT
        await axios.post(`/api/products`, data);
      }
      router.push('/products');
    } catch (error) {
      console.log(error);
    }
  }, [router, name, description, price, _id]);

  const handleUploadImages = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target?.files;
      if (!files) {
        return;
      }
      const formData = new FormData();

      for (let i = 0; i < files.length; ++i) {
        formData.append('images', files[i]);
      }
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    },
    []
  );

  return (
    <div>
      <label htmlFor=""> Product name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Product name"
      />
      <label htmlFor="">Images</label>
      <div className="mb-2">
        <label
          htmlFor="upload"
          className=" flex flex-col items-center justify-center w-24 h-24  rounded-md bg-gray-200 cursor-pointer"
        >
          <AiOutlineUpload size={24} /> <span>Upload</span>
          <input
            id="upload"
            type="file"
            multiple
            onChange={handleUploadImages}
            className="h-full w-full hidden"
          />
        </label>
        {!images?.length && <div> No images in this product</div>}
      </div>
      <div></div>
      <label htmlFor="">Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />

      <label htmlFor="">Price (in USD)</label>
      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="Price"
      />

      <button onClick={handleSubmit} className="btn-primary">
        Save
      </button>
    </div>
  );
};

export default ProductForm;
