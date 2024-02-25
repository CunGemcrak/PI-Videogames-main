const validation = (userData)=>{
    
const errors ={};
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if(!userData.name && userData.name.trim().length === 0 ){
        errors.name = 'El nombre no deben estar Vacia';
    }else
    if(userData.name.trim().length <= 2 && userData.name.trim().length >=250){
        errors.name= 'El nombre debe tener minino 2 letras';

    }else
    if(!userData.description && userData.description.trim().length === 0){
        errors.description = 'LA descriptions no deben estar Vacia';
    }else
    if(userData.description.length <100 ){
        errors.description= 'La describcion debe tener minimo 100 caracteres';

    }else

    if(!userData.release_date && userData.release_date.trim().length === 0){
        errors.release_date = 'La fecha no deben estar Vacia';
    } else

    if(!/^\d{4}\/\d{2}\/\d{2}$/.test(userData.release_date)){
        errors.release_date = 'La fecha debe tener el formato AAAA/MM/DD';
    } else


    if(!userData.rating && userData.rating.trim().length === 0){
        errors.rating = 'El rating no deben estar Vacios';
    }else
    if(!/^\d+$/.test(userData.rating)){
        errors.rating = 'Debe ser un número';
    }else
    if(!userData.platforms && userData.platforms.trim().length === 0){
        errors.platforms = 'El rating no deben estar Vacios';
    }else
    
    if(!userData.genres && userData.genres.trim().length === 0){
        errors.genres = 'La imagen no deben estar Vacios';
    }else
    if(!userData.image && userData.image.trim().length === 0){
        errors.image = 'La imagen no deben estar Vacios';
    }else
    if(!urlPattern.test(userData.image)){
        errors.image = 'Por favor, ingrese una URL válida para la imagen';
    }

    

/*
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i.test(userData.email)){
            errors.email = 'Mail ingresado incorrecto';
    }else
    if(!userData.email){
        errors.email = 'Mail debe ingresar un email';
    }else

    if(userData.email.length >35){
        errors.email = 'El Mail No debe superar los 35 Caracteres';
    }


    if(!/^(?=.*\d)/.test(userData.password)){
        errors.password = 'La password debe tener almenos un número ';
    }else
    if(userData.password.length <6 || userData.password.length >10){
        errors.password = 'Debestener de 6 a 10 carcateres';
    }else
    if(!/[A-Z]/.test(userData.password)){
        errors.password = 'Debe contener al menos una mayuscula';
    }else
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(userData.password)){
        errors.password = 'Debe contener al menos un caracter especial';
    }
*/
return errors;

}

export default validation