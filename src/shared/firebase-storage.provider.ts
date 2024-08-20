import { Injectable } from "@nestjs/common";
import { getDownloadURL, getStorage, ref, uploadBytes, UploadMetadata} from 'firebase/storage'
//import { storage } from "src/config/firebase.config";

@Injectable()
export class FirebaseStorageProvider{

    public async upload(file:Express.Multer.File,path:string,filename:string){
        try {
            
            const storage = getStorage()
            const fileExtension = file.originalname.split('.').pop();
            const fileRef = ref(storage, `${path}/${filename}.${fileExtension}`);
            const metadata: UploadMetadata = {
                contentType: file.mimetype,
              };
            const up= await uploadBytes(fileRef, file.buffer,metadata);
      
            // Obtener la URL de descarga pública
            const downloadURL = await getDownloadURL(fileRef);
      
            //return downloadURL;
            
            return { url: downloadURL, metadata: up.metadata };

        } catch (error) { 
            //console.error('Error al subir archivo a Firebase Storage:', error);
            throw new Error('Error al subir archivo a Firebase Storage');
        }
    }
}
