import { PageHeader } from "@/components/PageHeader";
import { MistakeList } from "@/components/MistakeList";

export default function MistakesPage() { return <><PageHeader eyebrow="Mistake Book" title="错题本" description="错误不是污点，而是下一轮复习最准确的地图。掌握后可以将错题归档。" /><MistakeList /></>; }
