'use client'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SearchFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get('q') || ''
  const cate = searchParams.get('cate') || ''

  function submitSearch(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const keyword = formData.get('keyword')
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (cate) params.set('cate', cate)
    router.push(`/heroes?${params.toString()}`)
  }

  function selectCategory(val) {
    const params = new URLSearchParams(searchParams.toString())
    if (val) params.set('cate', val)
    else params.delete('cate')
    router.push(`/heroes?${params.toString()}`)
  }

  return (
    <div className="search-filter-wrap">
      <form onSubmit={submitSearch} className="search-form">
        <input
          name="keyword"
          defaultValue={q}
          placeholder="🔍 搜索英雄名字"
          className="search-input"
        />
        <button type="submit" className="search-btn">搜索</button>
      </form>
      <div className="cate-buttons">
        <button onClick={() => selectCategory('')} className={cate === '' ? 'active' : ''}>全部</button>
        <button onClick={() => selectCategory('力量')} className={cate === '力量' ? 'active' : ''}>力量</button>
        <button onClick={() => selectCategory('敏捷')} className={cate === '敏捷' ? 'active' : ''}>敏捷</button>
        <button onClick={() => selectCategory('智力')} className={cate === '智力' ? 'active' : ''}>智力</button>
      </div>
    </div>
  )
}
