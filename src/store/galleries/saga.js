import { call, put, takeLatest } from "redux-saga/effects";
import { getAllGalleries, setGalleries, searchAllGalleries } from "./slice";
import GalleriesService from "../../services/galleries.service";

function* galleriesHandler() {
  try {
    const { data } = yield call(GalleriesService.getAll);
    console.log("data from saga");
    console.log(data);
    yield put(setGalleries(data));
  } catch (error) {
    console.log(error);
  }
}

function* searchGalleriesHandler(action) {
  try {
    const { take, skip, field, query } = action.payload;
    console.log(take)
    console.log(skip)
    console.log(field)
    console.log(query)
    const { data } = yield call(GalleriesService.getAll, take, skip, field, query);
    console.log("data from saga");
    console.log(data);
    yield put(setGalleries(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetAllGalleries() {
  yield takeLatest(getAllGalleries.type, galleriesHandler);
}

export function* watchSearchAllGalleries() {
  yield takeLatest(searchAllGalleries.type, searchGalleriesHandler);
}
