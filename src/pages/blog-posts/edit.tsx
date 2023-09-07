import { IResourceComponentsProps } from "@refinedev/core";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";
import { useParams } from 'react-router-dom';

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  return (
    <>
     
   <h1>{id}</h1> 
    </>
  );
};
