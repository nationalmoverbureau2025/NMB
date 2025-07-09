
import { SampleReportSection } from '../components/SampleReportSection'
import { FinalSection } from '../components/Home/FinalSection'
import { WhyYouNeedSection } from '../components/Home/WhyYouNeedSection'
import {HeroSection} from '../components/Home/HeroSection'

export function Home() {


  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <WhyYouNeedSection />

      <SampleReportSection />

      <FinalSection />
    </div>
  )
}
