import correo from "../images/correo.png"
import github from "../images/github.png"
import linkedin from "../images/linkedin.png"

const Footer = () => {
  return (
    <footer>
      <div className="desarrollado">
        <h4>Sitio web desarrollado por Sebastián Cioffi</h4>
      </div>
      <div className="secredes">
          <a href="mailto:sebacioffi12@gmail.com" target="_blank" rel="noopener noreferrer"><img src={correo} alt="" width="33px" /></a>
          <a href="https://github.com/sebascioffi?tab=repositories" target="_blank" rel="noopener noreferrer"><img src={github} className="github" alt="" width="33px" /></a>
          <a href="https://www.linkedin.com/in/sebasti%C3%A1n-cioffi-b56586239/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="" width="33px" /></a>
      </div>
    </footer>
  )
}

export default Footer
