import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const AcortadorUrl = () => {

    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        redirigir()
    }, [])

    const redirigir = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/links/${params.nanoLink}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const longLink = data.longLink;
                
                window.location.href = longLink;
            } else {
                throw new Error("Ha ocurrido un error")
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return null
}

export default AcortadorUrl
