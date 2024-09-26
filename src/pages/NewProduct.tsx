import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { uploadImage } from "../api/uploader";
import useProduct from "../hook/useProduct";
import { AddProduct } from "../types/mainType";
import Button from "../components/ui/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

export default function NewProduct() {
  const [product, setProduct] = useState<Partial<AddProduct>>({});
  const [file, setFile] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { addProduct } = useProduct("");
  const user = useRecoilValue(userState);
  const userAdmin = user?.isAdmin;
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!userAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files) {
      const newPreviewImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prevImages) => prevImages.concat(newPreviewImages));

      const uploadedUrls = await Promise.all(
        Array.from(files).map((file) => uploadImage(file))
      );
      setFile((prevFiles) => prevFiles.concat(uploadedUrls));

      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    if (file.length > 0) {
      addProduct.mutate(
        { product: product as AddProduct, file },
        {
          onSuccess: () => {
            setSuccess("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => setSuccess(null), 4000);
          },
        }
      );
      setIsUploading(false);
    } else {
      setIsUploading(false);
    }
  };

  return (
    <section className="w-[600px] container text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      <form
        className="flex flex-col px-12 gap-1 mt-[70px]"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            name="file"
            required
            multiple
            onChange={handleChange}
            ref={fileInputRef}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 bg-gray-300 flex items-center justify-center text-2xl text-gray-500 cursor-pointer"
          >
            +
          </div>
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-200 relative flex items-center justify-center"
            >
              <img
                src={image}
                alt={`uploaded ${index}`}
                className="object-cover w-full h-full"
              />
              <div
                // onClick={() => removeImage(index)}
                className="absolute top-0 right-0 p-1 text-xs text-gray-500"
              >
                ×
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="제품명"
          name="title"
          value={product.title ?? ""}
          required
          onChange={handleChange}
          className="mt-4"
        />
        <input
          type="number"
          placeholder="가격"
          name="price"
          value={product.price ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="카테고리"
          name="category"
          value={product.category ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="제품 설명"
          name="description"
          value={product.description ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="옵션들(콤마(,)로 구분"
          name="options"
          value={product.options ?? ""}
          required
          onChange={handleChange}
        />
        <Button
          text="제품 등록하기"
          type="submit"
          isLoading={isUploading}
          className="mb-[100px] mt-[10px] bg-puple text-white border border-puple hover:bg-white hover:text-puple"
        />
      </form>
    </section>
  );
}
