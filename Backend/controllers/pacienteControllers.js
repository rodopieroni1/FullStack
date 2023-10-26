import Paciente from "../models/Paciente.js";

const agregarPaciente = async(req, res) =>{
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json({pacienteAlmacenado});
        console.log(req.veterinario._id);
    } catch (error) {
        console.log(error);
    }
    //console.log(pacinete);
};

const obtenerPacientes = async (req, res) =>{
const pacientes = await Paciente.find()
.where("veterinario")
.equals(req.veterinario);
res.json(pacientes);
};

const obtenerPaciente = async(req, res)=>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    console.log(paciente.veterinario._id);
    console.log(req.veterinario._id);

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no validA"});
    }

    if(paciente){
            res.json(paciente);
    }
};
const actualizarPaciente =async(req, res)=>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    console.log(paciente.veterinario._id);
    console.log(req.veterinario._id);
    
    if(!paciente){
        return res.status(404).json({msg:"No encontrado"});       
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no validA"});
    }
   
   //Actualizar paciewnte
   paciente.nombre = req.body.nombre || paciente.nombre;
   paciente.propietario = req.body.propietario || paciente.propietario;
   paciente.fecha = req.body.fecha || paciente.fecha;

   try {
    const pacienteActualizado = await paciente.save();                                                                                                                                                                                                                                                                              
    res.json(pacienteActualizado                                                                                                                                                                                                                                                                                                                                                                                                            );
   } catch (error) {
    console.log(error);
   }                                                                                                                                                                                                      

}
const eliminarPaciente =async(req, res)=>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    console.log(paciente.veterinario._id);
    console.log(req.veterinario._id);
    
    if(!paciente){
        return res.status(404).json({msg:"No encontrado"});       
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no validA"});
    }
    try {
        await paciente.deleteOne();
        res.json({msg:"Paciente eliminado"});
    } catch (error) {
        console.log(error);

    }

}


export {agregarPaciente, obtenerPacientes , obtenerPaciente , actualizarPaciente, eliminarPaciente};