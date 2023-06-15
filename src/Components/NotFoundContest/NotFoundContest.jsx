import React from 'react'
import styles from './NotFoundContest.module.scss';
export default function NotFoundContest() {
  return (
    <div className={styles.sectionNotFoundContest}>
        <img
            src="https://img.freepik.com/free-vector/purchase-ban-online-store-website-error-cancel-buying-order-placing-inability-buy-limit-budget-line-online-buyer-cartoon-character-vector-isolated-concept-metaphor-illustration_335657-2844.jpg?w=900&t=st=1685802610~exp=1685803210~hmac=08ec40f15612c7a47f9759e57af51b803e24cbaecbd190caea5e9e59e2d1fb92"
            alt="notFound"
          />
        <h3>Извините, мы не нашли конкурс</h3>
    </div>
  )
}
