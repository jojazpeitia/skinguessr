import TopBar from './components/TopBar';
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex"> 
      <TopBar/>
      <div className="flex items-center justify-center">
    <Image
        src="/images/awp/cu_awp_chroma_pink.png"
        width={500}
        height={500}
        alt="awp_chroma_pink"
    />
    <Image
        src="/images/awp/cu_medieval_dragon_awp.png"
        width={500}
        height={500}
        alt="awp_medieval_dragon"
    />
    
</div>
    </div>
    
  )
}
