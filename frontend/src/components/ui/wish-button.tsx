const WishButton = () => {
  return (
    <button
      className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'
      aria-label='cart-button'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 23.947 20.316'
        className='w-5 h-auto'
      >
        <path
          id='wishlist'
          d='M22.625,42.316a6.039,6.039,0,0,0-2.779-2.35,6.685,6.685,0,0,0-4.217-.283,9.018,9.018,0,0,0-3.805,2.084,9.018,9.018,0,0,0-3.806-2.084,6.682,6.682,0,0,0-4.217.283,6.039,6.039,0,0,0-2.779,2.351A6.942,6.942,0,0,0,0,46.173c.116,6.341,9.561,12.106,11.453,13.2a.739.739,0,0,0,.738,0c1.892-1.092,11.338-6.858,11.453-13.2a6.942,6.942,0,0,0-1.021-3.856Zm-.457,3.829c-.037,2.05-1.4,4.44-3.952,6.912a36.1,36.1,0,0,1-6.393,4.817,36.076,36.076,0,0,1-6.392-4.816C2.884,50.586,1.517,48.2,1.48,46.146a4.873,4.873,0,0,1,2.894-4.818,4.925,4.925,0,0,1,1.917-.38A7.194,7.194,0,0,1,11.3,43.305a.739.739,0,0,0,1.054,0c2.1-2.132,4.75-2.89,6.923-1.977a4.873,4.873,0,0,1,2.894,4.817Z'
          transform='translate(0.149 -39.313)'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='0.3'
        />
      </svg>

      <span className='cart-counter-badge flex items-center justify-center bg-heading text-gray-100 hover:text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold'>
        0
      </span>
    </button>
  )
}

export default WishButton
