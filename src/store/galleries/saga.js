import { call, put, takeLatest } from "redux-saga/effects";
import { getAllGalleries, setGalleries } from "./slice";
import GalleriesService from "../../services/galleries.service";

function* galleriesHandler () {
    try {
        const { data } = yield call(GalleriesService.getAll)
        console.log('data from saga');
        console.log(data);
        yield put(setGalleries(data))
    } catch (error) {
        console.log(error)
    }
}

export function* watchGetAllGalleries() {
    yield takeLatest(getAllGalleries.type, galleriesHandler);
    }