import { IResourceComponentsProps } from "@refinedev/core";

import dataProvider from "@refinedev/simple-rest";



import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { EditButton } from "@refinedev/mui";
import { useState, useEffect, useRef } from "react";
import axios from "../../AuthenticationApis/api";
import { useNavigate } from "react-router-dom";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  recordItemId: string;
  dataFetch: () => Promise<void>
  
}

export const BlogPostEdit: React.FC<Props & IResourceComponentsProps> = ({ recordItemId,dataFetch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState();
  const [err,setErr]=useState(false)
  const id = recordItemId;
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const navigate=useNavigate()
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/user?id=${id}`)
      .then((response) => {
        
        setLoading(true);
        setData(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const response = await axios.put("/user", { name, email, id });
    
    if(response?.data?.status){
      console.log("call comes")
      dataFetch()
      handleClose()
      

    
    }else{
      setErr(true)
    }

  };

  return (
    <>
      <EditButton hideText onClick={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Edit User</Typography>
           {err&&<p style={{color:'red',padding:1}}>try after some time</p>}
          <form
            onSubmit={handleSubmit}
            style={{
              width: "300px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={data?.name}
              ref={nameRef}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={data?.email}
              ref={emailRef}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
              required
            />
            <Button type="submit">Save</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};


//////-------------------------------------------------------------




// import { IResourceComponentsProps } from "@refinedev/core";

// import dataProvider from "@refinedev/simple-rest";




// import {Box,TextField, Autocomplete} from "@mui/material";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { EditButton,Edit, useAutocomplete } from "@refinedev/mui";
// import { useState, useEffect, useRef } from "react";
// import axios from "../../AuthenticationApis/api";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "@refinedev/react-hook-form"
// import { Controller } from "react-hook-form";


// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// interface Props {
//   recordItemId: string;
// }






// export const BlogPostEdit: React.FC<Props & IResourceComponentsProps> = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [loading, setLoading] = useState<Boolean>(false);
//   const [data, setData] = useState();
//   const [err,setErr]=useState(false)
//   // const id = recordItemId;
//   const nameRef = useRef<HTMLInputElement | null>(null);
//   const emailRef = useRef<HTMLInputElement | null>(null);
//   const navigate=useNavigate()
//   const {
//     saveButtonProps,
//     refineCore: { queryResult },
//     register,
//     control,
//     formState: { errors },
// } = useForm();

// // const samplesData = queryResult?.data?.data;

// const samplesData= queryResult?.data?.data


// useEffect(()=>{
//   getdata()
// },[])

// const getdata=async()=>{
//   const samplesData=await queryResult
//   console.log(samplesData,':sample data')
// }


//     const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
//         resource: "users",
//         defaultValue: samplesData?.users?.id,
//     });

   

//   return (
//     <>
//       <EditButton hideText onClick={handleOpen} />

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >



//        <Edit saveButtonProps={saveButtonProps}>
//             <Box
//                 component="form"
//                 sx={{ display: "flex", flexDirection: "column" }}
//                 autoComplete="off"
//             >
//                 <TextField
//                     {...register("id", {
//                         required: "This field is required",
//                     })}
//                     error={!!(errors as any)?.id}
//                     helperText={(errors as any)?.id?.message}
//                     margin="normal"
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                     type="number"
//                     label="Id"
//                     name="id"
//                     disabled
//                 />
//                 <TextField
//                     {...register("title", {
//                         required: "This field is required",
//                     })}
//                     error={!!(errors as any)?.title}
//                     helperText={(errors as any)?.title?.message}
//                     margin="normal"
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                     type="text"
//                     label="Title"
//                     name="title"
//                 />
//                 <Controller
//                     control={control}
//                     name="category"
//                     rules={{ required: "This field is required" }}
//                     // eslint-disable-next-line
//                     defaultValue={null as any}
//                     render={({ field }) => (
//                         <Autocomplete
//                             {...categoryAutocompleteProps}
//                             {...field}
//                             onChange={(_, value) => {
//                                 field.onChange(value);
//                             }}
//                             getOptionLabel={(item) => {
//                                 return (
//                                     categoryAutocompleteProps?.options?.find(
//                                         (p) =>
//                                             p?.id?.toString() ===
//                                             item?.id?.toString(),
//                                     )?.title ?? ""
//                                 );
//                             }}
//                             isOptionEqualToValue={(option, value) =>
//                                 value === undefined ||
//                                 option?.id?.toString() ===
//                                     (value?.id ?? value)?.toString()
//                             }
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     label="Category"
//                                     margin="normal"
//                                     variant="outlined"
//                                     error={!!(errors as any)?.category?.id}
//                                     helperText={
//                                         (errors as any)?.category?.id?.message
//                                     }
//                                     required
//                                 />
//                             )}
//                         />
//                     )}
//                 />
//             </Box>
//         </Edit> 











//       </Modal>
//     </>
//   );
// };
