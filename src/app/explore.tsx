import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  LabScreen,
  Label,
  Notice,
  ui,
  useLabTheme,
} from '@/components/lab-ui';
import lab from '@/constants/lab.json';
export default function GuideScreen() {
  const t = useLabTheme();
  return (
    <LabScreen title="Khám phá thêm." subtitle={'Cách trải nghiệm ' + lab.name}>
      <Card>
        <Label>BÀI THỰC HÀNH {String(lab.number).padStart(2, '0')}</Label>
        <Text style={[ui.heading, { color: t.text }]}>{lab.name}</Text>
        <Notice>{lab.instructions}</Notice>
        <Link href="/" asChild>
          <Pressable
            accessibilityRole="link"
            style={StyleSheet.flatten([
              ui.action,
              { backgroundColor: t.solid },
            ])}
          >
            <Text style={[ui.actionText, { color: '#FFFFFF' }]}>
              Bắt đầu trải nghiệm →
            </Text>
          </Pressable>
        </Link>
      </Card>
      <Card>
        <Label>MỘT TRẢI NGHIỆM VỪA VẶN</Label>
        {[
          'Tự điều chỉnh trên điện thoại, máy tính bảng và trình duyệt.',
          'Giao diện sáng hoặc tối theo cài đặt thiết bị.',
          'Cuộn để xem đầy đủ nội dung trên màn hình nhỏ.',
        ].map((line, i) => (
          <View key={line} style={{ flexDirection: 'row', gap: 12 }}>
            <Text style={{ color: t.accent, fontWeight: '700' }}>
              {String(i + 1).padStart(2, '0')}
            </Text>
            <Text style={[ui.notice, { color: t.muted, flex: 1 }]}>{line}</Text>
          </View>
        ))}
      </Card>
    </LabScreen>
  );
}
