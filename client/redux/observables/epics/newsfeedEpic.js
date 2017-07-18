import { POSTING_CONTENT, POSTING_ABORTED } from '../../constants';
import { postingSuccess, postingFailure } from '../../actions/PageActions/newsfeedPage';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const newsfeedEpic = action$ => 
	action$.ofType(POSTING_CONTENT)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/posts/submit', action.payload))
				.map(res => postingSuccess(res))
				.takeUntil(action$.ofType(POSTING_ABORTED))
				.catch(error => Observable.of(postingFailure(error)))
		)