import React from 'react';
import NewCategoryAdvertisement from "../../components/NewCategoryAdvertisement/NewCategoryAdvertisement.jsx";
import {useFetchAllCategoryAdvertisementQuery} from "../../redux/category/category.api.js";
import CategoryAdvertisementItem from "../../components/CategoryAdvertisement/CategoryAdvertisementItem.jsx";
import AdvertisementItem from "../../components/AdvertisementItem.jsx";
import NewAdvertisement from "../../components/NewAdvertisement/NewAdvertisement.jsx";
import {useFetchAllAdvertisementQuery} from "../../redux/advertisement/advertisement.api.js";

const Advertisements = () => {
    const {data:categories} = useFetchAllCategoryAdvertisementQuery()
    const {data:main} = useFetchAllAdvertisementQuery()

    return (
        <div className={'container'}>
            <h1 className="title">Баннеры</h1>
            <div style={{padding:16, borderBottom:'2px solid #fffafa'}}>
                <h2 className="subtitle">Категории</h2>
                <NewCategoryAdvertisement/>
                {
                    !categories?.length ?
                        <p style={{
                            margin:'36px auto',

                        }}> нет банерров</p>
                        :
                        <div className="row-wrap">
                            {
                                categories?.map(el => <CategoryAdvertisementItem key={el._id} data={el}/>)
                            }
                        </div>
                }
            </div>
            <div style={{padding: 16, borderBottom: '2px solid #fffafa'}}>
                <h2 className="subtitle">На главной</h2>
                <NewAdvertisement/>
                {
                    !main?.length ?
                        <p style={{
                            margin: '36px auto',

                        }}> нет банерров</p>
                        :
                        <div className="row-wrap">
                            {
                                main?.map(el => <AdvertisementItem key={el._id} data={el}/>)
                            }
                        </div>
                }
            </div>


        </div>
    );
};

export default Advertisements;
