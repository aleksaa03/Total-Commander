import ArticleIcon from "@mui/icons-material/Article";
import PhotoIcon from "@mui/icons-material/Photo";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import FolderZipIcon from "@mui/icons-material/FolderZip";

export default function Icon({ ext }) {
  switch (ext) {
    case ".exe":
      return <ArticleIcon className="text-blue-500" />;
    case ".jpg":
    case ".JPG":
    case ".png":
    case ".PNG":
    case ".svg":
    case ".webp":
      return <PhotoIcon className="text-green-500" />;
    case ".mp3":
    case ".wav":
    case ".ogg":
      return <AudioFileIcon className="text-rose-500" />;
    case ".mp4":
    case ".webp":
    case ".mpeg":
    case ".wmv":
    case ".ogv":
      return <VideoFileIcon className="text-purple-500" />;
    case ".zip":
    case ".rar":
      return <FolderZipIcon className="text-yellow-900" />;
    default:
      return <InsertDriveFileIcon className="text-gray-500" />;
  }
}
