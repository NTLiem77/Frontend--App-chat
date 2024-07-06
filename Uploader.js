import {useState, React} from 'react'
import './Upload.css'
function Uploader(){
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    return(
        <main>
            <input type={"file"} accept={'image/*'} className={'input-field'} hidden
                   onChange={({target: {files}}) =>{
                       files[0] && setFileName(files[0].name)
                       if (files){
                           setImage(URL.createObjectURL(files[0]))
                       }
                   }}
            />
            {
                image ?
                    <img src={image} width={150} height={150} alt={fileName}/>
                    :<>
                        <ion-icon   onClick={() => document.querySelector(".input-field").click()} name="attach-outline" role="img" className="md hydrated"
                                    aria-label="attach outline"  ></ion-icon>
                    </>
            }


            <section className={'uploaded-row'}>
                <span>
                    {fileName}
                </span>
            </section>
        </main>
    )
}
export default Uploader