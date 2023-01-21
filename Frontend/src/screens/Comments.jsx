import { useParams } from 'react-router';
import { Comment } from '../components/Comment';

export const Comments = () => {
    
    const {id} = useParams()

    return (
        <div>
            <h1>{String(id)}</h1>
            {/* <Comment id={id}/> */}
        </div>
    );
}