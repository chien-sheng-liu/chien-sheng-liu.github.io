# Component Design Patterns

## Hero Section Patterns

### ✅ 推薦模式

#### Focused Hero
```jsx
// 單一核心訊息，充足留白
<section className="min-h-[70vh] flex items-center">
  <div className="max-w-4xl">
    <h1 className="text-5xl font-bold mb-6">核心價值主張</h1>
    <p className="text-xl mb-8 max-w-2xl">簡潔有力的描述</p>
    <Button size="lg">單一主要行動</Button>
  </div>
</section>
```

#### Asymmetric Hero  
```jsx
// 非對稱佈局，創造動態感
<section className="grid grid-cols-12 min-h-screen">
  <div className="col-span-7 flex items-center">
    <Content />
  </div>
  <div className="col-span-5 relative">
    <VisualElement className="absolute top-1/4 -translate-y-1/4" />
  </div>
</section>
```

### ❌ 避免模式

```jsx
// 資訊密度過高
<Hero>
  <Title />
  <Subtitle />
  <Tags />
  <Stats />
  <MultipleButtons />
  <SocialLinks />
</Hero>
```

## Timeline Component Patterns

### ✅ 流動設計

#### Serpentine Timeline
```jsx
const TimelineItem = ({ item, index, isEven }) => (
  <div className={`relative ${isEven ? 'ml-12' : 'mr-12'} mb-16`}>
    <div className="absolute -top-2 left-0 w-3 h-3 rounded-full bg-accent" />
    <Card className={`${isEven ? 'transform rotate-1' : 'transform -rotate-1'}`}>
      <Content />
    </Card>
  </div>
);
```

#### Dynamic Sizing
```jsx
const getCardSize = (importance) => {
  const sizes = {
    high: 'p-8 text-lg scale-105',
    medium: 'p-6 text-base',
    low: 'p-4 text-sm opacity-80'
  };
  return sizes[importance] || sizes.medium;
};
```

### ❌ 機械排列

```jsx
// 避免：統一尺寸，直線排列
<div className="space-y-4">
  {items.map(item => (
    <div className="w-full p-4 border">{item}</div>
  ))}
</div>
```

## Color System Patterns

### ✅ 層級色彩

#### Primary Hierarchy
```css
.priority-high { 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.priority-medium {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.priority-low {
  background: rgba(102, 126, 234, 0.05);
  color: rgba(102, 126, 234, 0.7);
}
```

#### Depth System
```jsx
const depths = {
  background: 'z-0 opacity-40',
  content: 'z-10 opacity-80', 
  focus: 'z-20 opacity-100 scale-105',
  overlay: 'z-30 backdrop-blur-sm'
};
```

## Motion Patterns

### ✅ 精緻動畫

#### Stagger Entrance
```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
```

#### Subtle Hover
```css
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
```

### ❌ 過度炫技

```jsx
// 避免：無意義的旋轉、跳躍、閃爍
<div className="animate-spin animate-bounce animate-pulse">
```

## Layout Anti-Patterns

### 避免 Dashboard 佈局

```jsx
// ❌ 網格卡片堆疊
<div className="grid grid-cols-3 gap-4">
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
  <Card>Feature 3</Card>
  <Card>Feature 4</Card>
  <Card>Feature 5</Card>
  <Card>Feature 6</Card>
</div>

// ✅ 有機佈局
<div className="space-y-12">
  <PrimaryFeature className="col-span-full" />
  <div className="grid grid-cols-2 gap-8">
    <SecondaryFeature />
    <TertiaryFeature />
  </div>
  <SupportingContent className="max-w-3xl" />
</div>
```

## Responsive Principles

```jsx
// Mobile-first, content-priority
const ResponsiveSection = () => (
  <section className="px-4 py-8 md:px-8 md:py-16 lg:px-12 lg:py-24">
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8 md:space-y-12 lg:space-y-16">
        <Hero className="text-center lg:text-left" />
        <Content className="lg:grid lg:grid-cols-12 lg:gap-16" />
      </div>
    </div>
  </section>
);
```