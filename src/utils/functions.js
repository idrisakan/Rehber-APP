const fullname = (name, surname) => {
  return `${name} ${surname}`;
};

const getInitial = (name, surname) =>{
  return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
}

export {fullname, getInitial};
