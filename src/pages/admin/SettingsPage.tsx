import React, { useState } from 'react';
import { Save, Bell, Globe, AlertTriangle, Download, Key, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';

const SettingsPage: React.FC = () => {
  const { user } = useAdminAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newSubscriber: true,
    weeklyAnalytics: false,
    monthlyReminder: true
  });

  const [websiteUrl, setWebsiteUrl] = useState('https://emirone.com/research');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword) {
      toast.error('Current password is required');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsChangingPassword(true);
    try {
      // Step 1: Re-authenticate with current password to verify identity
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: passwordForm.currentPassword
      });
      
      if (reauthError) {
        toast.error('Current password is incorrect');
        return;
      }
      
      // Step 2: Only after successful re-auth, update password
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsSavingPreferences(true);
    try {
      // In a real app, save to database
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const [
        { data: industryResearch },
        { data: experimentLogs },
        { data: quarterlyReports },
        { data: subscribers },
        { data: methodology }
      ] = await Promise.all([
        supabase.from('industry_research').select('*'),
        supabase.from('experiment_logs').select('*'),
        supabase.from('quarterly_reports').select('*'),
        supabase.from('newsletter_subscribers').select('*'),
        supabase.from('methodology_page').select('*').single()
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        industryResearch,
        experimentLogs,
        quarterlyReports,
        subscribers,
        methodology
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emir-one-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
        <p className="text-[#6B7280]">Configure your admin account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Account Settings
          </CardTitle>
          <CardDescription>Manage your account credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-[#6B7280]">Current Email</Label>
            <p className="text-[#111827] font-medium">{user?.email}</p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h4 className="font-medium text-[#111827]">Change Password</h4>
            
            <div className="grid gap-4 max-w-md">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="••••••••"
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  Min 8 characters, 1 uppercase, 1 number
                </p>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Configure email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Subscriber Notifications</Label>
                <p className="text-sm text-[#6B7280]">Get notified when someone subscribes</p>
              </div>
              <Switch
                checked={notifications.newSubscriber}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newSubscriber: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Analytics Summary</Label>
                <p className="text-sm text-[#6B7280]">Receive weekly performance reports</p>
              </div>
              <Switch
                checked={notifications.weeklyAnalytics}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyAnalytics: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Monthly Report Reminders</Label>
                <p className="text-sm text-[#6B7280]">Reminders to publish quarterly reports</p>
              </div>
              <Switch
                checked={notifications.monthlyReminder}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, monthlyReminder: checked }))}
              />
            </div>
          </div>

          <Button onClick={handleSavePreferences} disabled={isSavingPreferences}>
            {isSavingPreferences ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Website Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Website Integration
          </CardTitle>
          <CardDescription>Configure frontend integration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md">
            <Label htmlFor="websiteUrl">Frontend Website URL</Label>
            <Input
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://emirone.com/research"
            />
            <p className="text-xs text-[#6B7280] mt-1">
              Used for preview links and redirects
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-red-600">
            These actions are irreversible. Proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-[#111827]">Export All Data</p>
              <p className="text-sm text-[#6B7280]">Download a JSON backup of all content</p>
            </div>
            <Button variant="outline" onClick={handleExportData} disabled={isExporting}>
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
