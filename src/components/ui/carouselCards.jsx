import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import GroupCard from './groupCard'
const CarouselCards = ({ mockGroups }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="relative md:translate-x-[0] lg:translate-x-[-1%] xl:translate-x-[-8%] rounded-2xl md:bg-[#4a3aff26] md:shadow-[0_0_15px_rgba(74,58,255,0.5)]"
    >
      <CarouselContent className="-ml-1 rounded-2xl ">
        {mockGroups.map((mockGroups) => (
          <CarouselItem
            key={mockGroups.id}
            // className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            className="bg-transparent text-center justify-center
            rounded-2xl pl-1 md:basis-1/3 lg:basis-1/4 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <div className="py-1 md:bg-transparent">
              <GroupCard
                title={mockGroups.title}
                datasets={mockGroups.datasets}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselCards
