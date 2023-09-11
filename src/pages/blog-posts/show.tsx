import { IResourceComponentsProps } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from '../../AuthenticationApis/api'

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
     const { id } = useParams();
     const [loading,setLoading]=useState<Boolean>(false)
     const [data,setData]=useState()
      
     useEffect(()=>{
       setLoading(true)
       axios.get(`/user?id=${id}`).then((response)=>{
        console.log(response?.data)
        setLoading(true)
        setData(response?.data)
       }).catch((err)=>{
        console.log(err)
       })
     },[])
  
     return (

   
<div>
<div>

</div>

<div>
   
   <p>{data?.id}</p>
    <p>{data?.name}</p>
    <p>{data?.email}</p>
   
    
    </div>

</div>
  )
};
