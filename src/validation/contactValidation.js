import * as Yup from 'yup';

const ContactValidation = Yup.object().shape({
    fullname: Yup.string().required('نام و نام خانوادگی الزامی است.'),
    email: Yup.string().email("ایمیل معتبر نیست.").required("ایمیل الزامی است."),
    photo: Yup.string().url("آدرس تصویر معتبر نیست.").required("تصویر الزامی است."),
    group: Yup.string().required("انتخاب گروه الزامی است."),
    mobile: Yup.string().required("شماره موبایل الزامی است."),
    job: Yup.string().required("شغل الزامی است."),
})

export default ContactValidation;