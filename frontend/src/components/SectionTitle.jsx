import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const SectionTitle = ({ title, subtitle, link }) => {
  return (
    <div className='flex items-end justify-between mb-8'>
      <div className='flex flex-col gap-1'>
        {/* 소제목 */}
        <span className='text-primary-400 font-bold tracking-widest text-sm uppercase'>
          {subtitle}
        </span>
        {/* 대제목 */}
        <h2 className='text-4xl font-bold text-white tracking-tight'>
          {title}
        </h2>
      </div>

      {/* 전체보기 링크 */}
      {link && (
        <Link 
          to={link} 
          className='flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-lg font-medium group'
        >
          전체보기
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className='text-sm transition-transform group-hover:translate-x-1' 
          />
        </Link>
      )}
    </div>
  )
}

export default SectionTitle
