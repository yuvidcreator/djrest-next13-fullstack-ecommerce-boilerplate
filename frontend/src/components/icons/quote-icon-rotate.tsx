const QuoteIconRotate = ({
  color = '#efefef',
  width = '36px',
  height = '27px',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 36 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M0.000957375 5.5725L1.15563 0C9.4719 0.4005 15.2363 4.0305 15.2363 14.709V27H0.707753V11.55H6.21325C6.21027 8.1255 4.16133 6.111 0.000957375 5.5725Z'
        fill={color}
      />
      <path
        d='M20.7647 5.5725L21.9193 0C30.2356 0.4005 36 4.0305 36 14.709V27H21.4714V11.55H26.9769C26.9769 8.1255 24.928 6.111 20.7647 5.5725Z'
        fill={color}
      />
    </svg>
  )
}

export default QuoteIconRotate
