import React, {useEffect} from 'react';
import NewCategoryAdvertisement from "../../components/NewCategoryAdvertisement/NewCategoryAdvertisement.jsx";
import {useFetchAllCategoryAdvertisementQuery} from "../../redux/category/category.api.js";
import CategoryAdvertisementItem from "../../components/CategoryAdvertisement/CategoryAdvertisementItem.jsx";

const CategoryAdvertisement = () => {
    const {data, isSuccess} = useFetchAllCategoryAdvertisementQuery()
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
    }, [data, isSuccess])

    return (
        <div className={'container'}>
            <h1 className="title">Баннеры</h1>
            <NewCategoryAdvertisement/>
            {
                !data?.length ?
                    <p style={{
                        margin:'36px auto',

                    }}> нет банерров</p>
                    :
                    <div className="row-wrap">
                        {
                            data?.map(el => <CategoryAdvertisementItem key={el._id} data={el}/>)
                        }
                    </div>
            }

        </div>
    );
};

export default CategoryAdvertisement;
