
  # Al-Alsad

  This is a code bundle for Al-Alsad. The original project is available at https://www.figma.com/design/69LHB3TbKeNc0PsfMDZFUD/Al-Asad.

  ## Tech Stack

  - **Frontend**: React 18 with TypeScript
  - **Build Tool**: Vite
  - **Styling**: Tailwind CSS
  - **UI Components**: Radix UI (shadcn/ui)
  - **Icons**: Lucide React
  - **Charts**: Recharts
  - **Forms**: React Hook Form

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Coding Guidelines

  ### Project Structure
  ```
  src/
  ├── components/          # Reusable UI components
  │   ├── ui/             # shadcn/ui components
  │   └── figma/          # Figma-specific components
  ├── pages/              # Page components
  ├── styles/             # Global styles
  ├── guidelines/         # Project guidelines
  └── ...
  ```

  ### Component Development
  - Use TypeScript for all components
  - Follow React functional components with hooks
  - Use Tailwind CSS for styling
  - Leverage shadcn/ui components for consistent UI
  - Implement proper TypeScript interfaces for props

  ### File Naming
  - Components: PascalCase (e.g., `UserDashboard.tsx`)
  - Files: camelCase (e.g., `userService.ts`)
  - Folders: kebab-case (e.g., `user-management`)

  ## Tutorial: Membuat Admin Dashboard dengan React/TypeScript

  ### Pendahuluan
  Tutorial ini akan memandu Anda membuat admin dashboard lengkap menggunakan React, TypeScript, dan shadcn/ui. Kita akan belajar dari implementasi dashboard yang sudah dibuat dalam project ini.

  ### 1. Setup Project dan Dependencies

  #### 1.1 Inisialisasi Project React + TypeScript + Vite
  ```bash
  npm create vite@latest my-admin-dashboard -- --template react-ts
  cd my-admin-dashboard
  npm install
  ```

  #### 1.2 Install Dependencies yang Diperlukan
  ```bash
  # UI Components (shadcn/ui)
  npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toast

  # Styling
  npm install tailwindcss @tailwindcss/postcss autoprefixer postcss class-variance-authority clsx tailwind-merge

  # Icons
  npm install lucide-react

  # Forms & Validation
  npm install react-hook-form @hookform/resolvers zod

  # Charts (opsional)
  npm install recharts

  # Development
  npm install -D @types/node
  ```

  #### 1.3 Setup shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  # Pilih: TypeScript, Tailwind CSS, src/components, etc.
  ```

  ### 2. Struktur Project

  ```
  src/
  ├── components/
  │   ├── ui/                    # shadcn/ui components
  │   ├── layout/               # Layout components
  │   └── forms/                # Form components
  ├── pages/                    # Page components
  ├── hooks/                    # Custom hooks
  ├── lib/                      # Utilities
  └── types/                    # TypeScript types
  ```

  ### 3. Membuat Layout Dasar Dashboard

  #### 3.1 Komponen Sidebar Navigation
  ```tsx
  // src/components/layout/Sidebar.tsx
  import React from 'react';
  import { Button } from '../ui/button';
  import { BarChart3, Users, FileText, Settings } from 'lucide-react';

  interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }

  const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    const menuItems = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'pages', label: 'Pages', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => onTabChange(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  };

  export default Sidebar;
  ```

  #### 3.2 Komponen Stat Card
  ```tsx
  // src/components/ui/StatCard.tsx
  import React from 'react';
  import { Card, CardContent, CardHeader, CardTitle } from './card';

  interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    description
  }) => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </CardContent>
      </Card>
    );
  };

  export default StatCard;
  ```

  ### 4. Implementasi Dashboard Utama

  #### 4.1 Komponen Dashboard
  ```tsx
  // src/pages/Dashboard.tsx
  import React, { useState } from 'react';
  import Sidebar from '../components/layout/Sidebar';
  import StatCard from '../components/ui/StatCard';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
  import { Users, FileText, Image, BarChart3, Menu, X } from 'lucide-react';
  import { Button } from '../components/ui/button';

  const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - ganti dengan API call
    const stats = {
      totalUsers: 1250,
      totalPages: 45,
      totalMedia: 320,
      activeSessions: 89
    };

    const OverviewTab = () => (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            description="+12% from last month"
          />
          <StatCard
            title="Total Pages"
            value={stats.totalPages}
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            description="+3 new pages"
          />
          <StatCard
            title="Media Files"
            value={stats.totalMedia}
            icon={<Image className="h-4 w-4 text-muted-foreground" />}
            description="+15 this week"
          />
          <StatCard
            title="Active Sessions"
            value={stats.activeSessions}
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            description="Currently online"
          />
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your website content</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">User Management</h3>
                  <p className="text-muted-foreground">Manage admin users and permissions</p>
                </div>
              </TabsContent>

              <TabsContent value="pages" className="mt-6">
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Pages Management</h3>
                  <p className="text-muted-foreground">Create and manage website pages</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Settings</h3>
                  <p className="text-muted-foreground">Configure your admin panel</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
  ```

  ### 5. Routing dengan React Router

  #### 5.1 Setup React Router
  ```bash
  npm install react-router-dom
  ```

  #### 5.2 Konfigurasi Routing
  ```tsx
  // src/App.tsx
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Dashboard from './pages/Dashboard';
  import Home from './pages/Home';

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }

  export default App;
  ```

  #### 5.3 Navigation dengan Link
  ```tsx
  // Dalam komponen navigation
  import { Link } from 'react-router-dom';

  // Gunakan Link untuk navigasi
  <Link to="/dashboard">
    <Button>Go to Dashboard</Button>
  </Link>
  ```

  ### 6. State Management dengan React Hooks

  #### 6.1 Custom Hook untuk API Calls
  ```tsx
  // src/hooks/useApi.ts
  import { useState, useEffect } from 'react';

  interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }

  function useApi<T>(url: string): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
  }

  export default useApi;
  ```

  #### 6.2 Penggunaan Hook dalam Komponen
  ```tsx
  // Dalam komponen Dashboard
  const { data: stats, loading, error } = useApi('/api/stats');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {stats && <StatCard title="Users" value={stats.totalUsers} />}
    </div>
  );
  ```

  ### 7. Forms dengan React Hook Form

  #### 7.1 Setup Form dengan Validation
  ```tsx
  // src/components/forms/UserForm.tsx
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

  const userSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'editor', 'viewer']),
  });

  type UserFormData = z.infer<typeof userSchema>;

  interface UserFormProps {
    onSubmit: (data: UserFormData) => void;
    initialData?: Partial<UserFormData>;
  }

  const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues: initialData,
    });

    const selectedRole = watch('role');

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={selectedRole}
            onValueChange={(value) => setValue('role', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creating...' : 'Create User'}
        </Button>
      </form>
    );
  };

  export default UserForm;
  ```

  ### 8. Best Practices

  #### 8.1 TypeScript Best Practices
  ```tsx
  // Gunakan interface untuk props
  interface DashboardProps {
    userId?: string;
    onUpdate?: (data: any) => void;
  }

  // Type untuk API responses
  interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }

  // Generic types untuk reusable components
  interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
  }
  ```

  #### 8.2 Performance Optimization
  ```tsx
  // Gunakan React.memo untuk komponen yang sering re-render
  const StatCard = React.memo<StatCardProps>(({ title, value, icon, description }) => {
    return (
      // ... komponen code
    );
  });

  // Gunakan useCallback untuk event handlers
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Gunakan useMemo untuk komputasi berat
  const filteredData = useMemo(() => {
    return data.filter(item => item.status === filterStatus);
  }, [data, filterStatus]);
  ```

  #### 8.3 Error Boundaries
  ```tsx
  // src/components/ErrorBoundary.tsx
  import React from 'react';

  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
            <p className="text-muted-foreground">Please try refreshing the page</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        );
      }

      return this.props.children;
    }
  }

  export default ErrorBoundary;
  ```

  ### 9. Testing dengan Jest dan React Testing Library

  #### 9.1 Setup Testing
  ```bash
  npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
  ```

  #### 9.2 Contoh Unit Test
  ```tsx
  // src/components/ui/__tests__/StatCard.test.tsx
  import { render, screen } from '@testing-library/react';
  import StatCard from '../StatCard';
  import { Users } from 'lucide-react';

  describe('StatCard', () => {
    it('renders title and value correctly', () => {
      render(
        <StatCard
          title="Total Users"
          value={1250}
          icon={<Users />}
          description="Active users"
        />
      );

      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('1250')).toBeInTheDocument();
      expect(screen.getByText('Active users')).toBeInTheDocument();
    });

    it('displays icon', () => {
      render(
        <StatCard
          title="Test"
          value={100}
          icon={<Users data-testid="users-icon" />}
        />
      );

      expect(screen.getByTestId('users-icon')).toBeInTheDocument();
    });
  });
  ```

  ### 10. Deployment

  #### 10.1 Build untuk Production
  ```bash
  npm run build
  ```

  #### 10.2 Deploy ke Vercel/Netlify
  ```bash
  # Vercel
  npm install -g vercel
  vercel

  # Netlify
  npm install -g netlify-cli
  netlify deploy
  ```

  ### Kesimpulan

  Tutorial ini telah memandu Anda membuat admin dashboard lengkap dengan React dan TypeScript. Anda telah belajar:

  - ✅ Setup project dengan Vite dan TypeScript
  - ✅ Install dan konfigurasi shadcn/ui
  - ✅ Membuat komponen reusable
  - ✅ State management dengan React hooks
  - ✅ Routing dengan React Router
  - ✅ Forms dengan validation menggunakan React Hook Form dan Zod
  - ✅ Best practices untuk TypeScript dan performance
  - ✅ Error handling dan testing
  - ✅ Deployment ke production

  Dashboard yang telah dibuat dapat diperluas dengan fitur-fitur tambahan seperti authentication, real-time updates, dan integrasi dengan backend API. Selamat coding! 🚀

  ### Best Practices
  - Use React hooks for state management
  - Implement proper error handling and loading states
  - Follow accessibility guidelines (WCAG)
  - Write clean, readable, and maintainable code
  - Use meaningful variable and function names
  - Add comments for complex logic

  ### Development Workflow
  1. Create feature branch from main
  2. Implement changes following the guidelines above
  3. Test thoroughly on different screen sizes
  4. Ensure TypeScript compilation passes
  5. Commit with descriptive messages
  6. Create pull request for review
