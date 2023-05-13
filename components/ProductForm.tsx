import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { lazy, useCallback, useState } from 'react';
import { AiFillCloseCircle, AiOutlineUpload } from 'react-icons/ai';
import Spinner from './Spinner';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import useCategories from '@/hooks/useCategory';

interface ProductFormProps {
  _id?: string;
  name?: string;
  description?: string;
  price?: string;
  images?: string[];
  category?: string;
  mutateFetchedProduct?: () => void;
}
const ProductForm: React.FC<ProductFormProps> = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  mutateFetchedProduct,
}) => {
  const [name, setName] = useState(existingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [category, setCategory] = useState(existingCategory || '');
  const [isUploading, setIsUploading] = useState(false);
  const [properties, setProperties] = useState({});
  const router = useRouter();

  const { data: fetchedCategories = [] } = useCategories();

  const handleSubmit = useCallback(async () => {
    const data = { name, description, price, images, category };

    try {
      if (_id) {
        // UPDATE PRODUCT
        await axios.patch(`/api/products/${_id}`, data);
      } else {
        // CREATE PRODUCT
        await axios.post(`/api/products`, data);
      }
      mutateFetchedProduct && mutateFetchedProduct();

      router.push('/products');
    } catch (error) {
      console.log(error);
    }
  }, [
    router,
    name,
    description,
    price,
    _id,
    images,
    category,
    mutateFetchedProduct,
  ]);

  const handleUploadImages = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target?.files;
      if (!files) {
        return;
      }
      setIsUploading(true);
      const formData = new FormData();

      for (let i = 0; i < files.length; ++i) {
        formData.append('images', files[i]);
      }
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data);
        setImages((prevImg) => [...prevImg, ...response.data]);
      } catch (error) {
        console.log(error);
      }
      setIsUploading(false);
    },
    []
  );

  const handleRemoveImage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const updatedImages = images.filter(
        (image: string) => image != event.currentTarget.dataset.imagelink
      );
      setImages(updatedImages);
    },
    [images]
  );

  const propertiesToFill = [];
  if (fetchedCategories.length > 0 && category) {
    let selectedCategory = fetchedCategories.find(
      ({ _id }: { _id: string }) => _id === category
    );
    propertiesToFill.push(...selectedCategory.properties);

    while (selectedCategory?.parent?._id) {
      const parentCategory = fetchedCategories.find(
        ({ _id }: { _id: string }) => _id === selectedCategory?.parent?._id
      );
      propertiesToFill.push(...parentCategory.properties);

      selectedCategory = parentCategory;
    }
  }
  return (
    <div>
      <label htmlFor=""> Product name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Product name"
      />

      <label htmlFor="">Category</label>
      <select
        name=""
        id=""
        className=" mb-2 "
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">Uncategorised</option>
        {fetchedCategories.map((category: Record<string, any>) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((property: Record<string, any>, index: number) => (
          <div
            key={index}
            className=" flex flex-row justify-start items-center gap-2"
          >
            <div>{property.name}</div>
            <select name="" id="">
              {property.value.map((v: string, index: number) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}

      <label htmlFor="">Images</label>
      <div className="flex flex-row space-x-2 items-center space-y-2 mb-2">
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
        <ReactSortable
          list={images}
          setList={setImages}
          className=" flex flex-row items-center space-x-2"
        >
          {images.map((link) => (
            <div key={link} className="h-24 relative">
              <img
                src={link}
                alt=" "
                className="inline-block h-24 w-24 rounded-md"
              />
              <button
                className="absolute top-0 right-0 p-1"
                data-imagelink={link}
                onClick={handleRemoveImage}
              >
                <AiFillCloseCircle className=" text-red-500 hover:text-red-600" />
              </button>
            </div>
          ))}
        </ReactSortable>

        {isUploading && (
          <div className="flex flex-col items-center justify-center h-24 w-24 rounded-md bg-gray-200 ">
            <Spinner />
          </div>
        )}
      </div>
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
