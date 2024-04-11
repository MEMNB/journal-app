import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'duuddv2tb',
    api_key: '274148446513394',
    api_secret: '0Cdn7PHVWq046RzqyF_YxnJEp_o',
    secure: true
}); //único para cada uno

describe('Pruebas en fileUpload', () => { 
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
        const imageUrl = 'https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File((blob), 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
     });

     test('debe de retornar null', async() => { 
        const file = new File((blob), 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe(null);
      })
 });