
import CreateImageInput from "../../resolvers/input/CreateImageInput";
//import DeleteImageInput from "../../resolvers/input/DeleteImageInput";
//import GetImageInput from "../../resolvers/input/GetImageInput";
import Image from "../Image";
import ProjectUtils from "./ProjectUtils";

class ImageUtils extends Image {
  static async createImage({ name, project, created_at }: CreateImageInput) {
      const newProject = await ProjectUtils.getProjectById({id: project })
      const image = new Image();
      image.name = name;
      image.project = newProject;
      image.created_at = created_at;
  
      await image.save();

      newProject.images = newProject.images ? [...newProject.images, image] : [image];
      await newProject.save();

      return image;
  }

//  static async deleteImage({ id }: DeleteImageInput) {
//    const Image = await Image.findOneOrFail({ id });

//    return await Image.remove(Image);
//  }

//  static async getImageById({ id }: GetImageInput) {
//    return await Image.findOneOrFail({ id });
//  }
};

export default ImageUtils;