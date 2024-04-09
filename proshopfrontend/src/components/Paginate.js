import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    // if (keyword) {
    //     keyword = keyword.split('?keyword=')[1].split('&')[0]
    // }
    // Log the values to check if they are passing correctly


    if (keyword && typeof keyword === 'string') {
        keyword = keyword.split('?keyword=')[1]?.split('&')[0] || ''; // Split only if keyword is a string
    }
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={{
                            pathname: '/',
                            search: `?keyword=${keyword}&page=${x + 1}`
                        }}                    >
                        <Pagination.Item active={x + 1 === parseInt(page)}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )

}

export default Paginate