import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginApi } from "../services/authentication";
import Swal from "sweetalert2";

// login hooks
export function useLoginHook() {
  const navigate = useNavigate();

  // form dengan react-form-hooks
  const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});

  const {mutate, isPending} = useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: (response) => {
      localStorage.setItem('jwtToken', response.token);
      
      Swal.fire({
        title: "Login Berhasil 🎉",
        text: "Selamat datang kembali!",
        icon: "success",
        confirmButtonText: "Masuk Dashboard",
        background: "#1A202C",
        color: "#fff",
        confirmButtonColor: "#3182ce",
        backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
      }).then((res) => {
        if(res.isConfirmed) navigate("/dashboard")
      });
    },
    onError: (err) => {
      console.error("Error Login: ", err.message);

      Swal.fire({
        title: "Login Gagal😓",
        text: "Maaf Login gagal, tolong periksa kembali username & password pastikan sudah benar.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1A202C",
        color: "#fff",
        confirmButtonColor: "#ce3131",
        backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
      })
    }
  });

  const onSubmit = (formData) => {
    mutate(formData);
  }

  return {register, handleSubmit, errors, onSubmit, isPending};
}