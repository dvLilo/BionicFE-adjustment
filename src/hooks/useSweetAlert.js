import Swal from "sweetalert2"

const useSweetAlert = () => {

  const confirm = ({
    title = "Are you sure you want to proceed?",
    text = "This will delete this transaction permanently. You cannot undo this action.",
    icon = "question",
    onConfirm = () => { }
  }) => Swal.fire({
    title: title,
    text: text,
    icon: icon,

    customClass: {
      container: "bioncSweetAlert bioncSweetAlert--modal",
      popup: "bioncSweetAlert__popup",
      icon: "bioncSweetAlert__icon",
      title: "bioncSweetAlert__title",
      htmlContainer: "bioncSweetAlert__text",
      actions: "bioncSweetAlert__actions",
      confirmButton: "bioncSweetAlert__button bioncSweetAlert__button--confirm",
      cancelButton: "bioncSweetAlert__button bioncSweetAlert__button--cancel",
    },

    showConfirmButton: true,
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No"
  }).then((action) => {
    if (action.isConfirmed) onConfirm()
  })

  const toast = ({
    title = "Success!",
    text = "Transaction has been deleted.",
    icon = "success",
  }) => Swal.fire({
    title: title,
    text: text,
    icon: icon,

    customClass: {
      container: "bioncSweetAlert bioncSweetAlert--toast",
      popup: "bioncSweetAlert__popup",
      icon: "bioncSweetAlert__icon",
      title: "bioncSweetAlert__title",
      htmlContainer: "bioncSweetAlert__text",
      actions: "bioncSweetAlert__actions",
      confirmButton: "bioncSweetAlert__button bioncSweetAlert__button--confirm",
      cancelButton: "bioncSweetAlert__button bioncSweetAlert__button--cancel",
    },

    toast: true,
    timer: 3000,
    position: "top-end",

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },

    showConfirmButton: false
  })

  return { confirm, toast }
}

export default useSweetAlert