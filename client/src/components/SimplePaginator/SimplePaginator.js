import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useHistory, useLocation } from 'react-router';
import { getUrlParams } from '../../services/global';

const SimplePaginator = ({ onPage = () => { }, pages, forcePage }) => {
    const location = useLocation();
    const history = useHistory();

    const [page, setPage] = useState(0);
    const [countPages, setCountPages] = useState();
    const [interval, _] = useState(5);
    const [arrPages, setArrPages] = useState([]);

    const { page: locationPage } = getUrlParams(location);

    useEffect(() => {
        setCountPages(pages);
        setArrPages(() => {
            const arr = [];
            let arrLength = pages > interval ? interval : pages;
            for (let i = 1; i <= arrLength; i++) {
                arr.push(i);
            }
            return arr;
        });
        if(pages>1){
            history.push(`?page=${1}`);
        }
    }, [pages]);

    useEffect(() => {
        //console.log('locationPage = ',locationPage);
        if (!locationPage) {
            //history.push(`?page=${1}`);
            //return;
            setPage(1);
        }else{
            setPage(Number(locationPage));
        }
    }, [location]);

    useEffect(() => {
        //console.log('SimplePaginator page = ', page);
        //console.log('page = ', page);
        setArrPages(() => {
            const arr = [];
            let correctEnd = 0;
            let correctStart = 0;
            let start = page - 2;
            //console.log(start);
            if (start < 1) {
                correctEnd = 1 + Math.abs(start);
                start = 1;
                //console.log('Math.abs(start) = ', Math.abs(start));
            }
            //console.log('correctEnd = ', correctEnd);
            //let start = page - 2>1?page-2:1;
            let end = page + 2 > countPages ? countPages : page + 2;

            //console.log(end);
            //console.log(end-start);

            if (end - start < 4 && correctEnd <= 0) {
                //console.log('correctStart = ',end-start-3);
                correctStart = 1 + Math.abs(end - start - 3);
            }
            //start = end-start<3?start-1:start;
            end = end + correctEnd;
            start = start - correctStart <= 0 ? 1 : start - correctStart;
            let arrLength = end > countPages ? countPages : end;
            for (let i = start; i <= arrLength; i++) {
                arr.push(i);
            }
            return arr;
        });

        //console.log('callback page');

        callback(page);
        //calcState();

    }, [page]);

    useEffect(()=>{
        console.log('forcePage = ', forcePage);
        if(forcePage){
            handlerClickPage(forcePage);
            //history.push(`?page=${forcePage}`);
            // if(forcePage===page){
            //     callback(page);
            // }
        }
    }, [forcePage]);

    const callback = (p) => {
        //console.log('p = ', p);
        if (p <= 0) {
            return;
        }

        if (typeof onPage === 'function') {
            onPage(p);
        }
    }

    const nextPage = () => {
        const p = page + 1;
        if (p > countPages) {
            return;
        }
        history.push(`?page=${p}`);
    };

    const prevPage = () => {
        const p = page - 1;
        if (p < 1) {
            return;
        }
        history.push(`?page=${p}`);
    };

    const handlerClickPage = (p) => {
        if (p === page) {
            return;
        }
        //console.log('handlerClickPage = ', p);
        history.push(`?page=${p}`);
    }

    return (
        <React.Fragment>
            {pages > 1 ?
                <Pagination>

                    <PaginationItem>
                        <PaginationLink first onClick={() => handlerClickPage(1)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous onClick={prevPage} />
                    </PaginationItem>

                    {interval < countPages && page > 3 ?
                        <React.Fragment>
                            <PaginationItem>
                                <PaginationLink onClick={() => handlerClickPage(1)}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink disabled>...</PaginationLink>
                            </PaginationItem>
                        </React.Fragment> :
                        null
                    }

                    {
                        arrPages.map((el) => {
                            return (
                                <PaginationItem key={el} active={el === page ? true : false}>
                                    <PaginationLink onClick={() => handlerClickPage(el)}>{el}</PaginationLink>
                                </PaginationItem>
                            );
                        })
                    }

                    {interval < countPages && page + 2 < countPages ?
                        <React.Fragment>
                            <PaginationItem>
                                <PaginationLink disabled>...</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handlerClickPage(countPages)}>{countPages}</PaginationLink>
                            </PaginationItem>
                        </React.Fragment> :
                        null
                    }

                    <PaginationItem>
                        <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last onClick={() => handlerClickPage(countPages)} />
                    </PaginationItem>

                </Pagination>
                :
                null
            }
        </React.Fragment>

    );
}

export default SimplePaginator;