import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cards from '../components/Home/Cards'
import { useProperties } from '../hooks/useProperties'

function Home(): JSX.Element {
  const { properties, filteredProperties, loading, error, filterProperties } =
    useProperties()

  const handleFilter = (query: string) => {
    filterProperties(query)
  }

  useEffect(() => {
    filterProperties('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties])

  if (loading) return <p>Cargando propiedades...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <Header onFilter={handleFilter} />
      <Cards properties={filteredProperties} />
      <Footer />
    </>
  )
}

export default Home
