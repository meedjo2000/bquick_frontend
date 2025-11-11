import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dropZoneFilePreview = (file:any, setFileDataURL:any) => {
  let fileReader:any, isCancel = false;
  if (file) {
    fileReader = new FileReader();
    fileReader.onload = (e:any) => {
      const { result } = e.target;
      if (result && !isCancel) {
        setFileDataURL(result)
      }
    }
    fileReader.readAsDataURL(file);
  }
  return () => {
    isCancel = true;
    if (fileReader && fileReader.readyState === 1) {
      fileReader.abort();
    }
  }
};