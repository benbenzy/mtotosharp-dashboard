'use server';
import { createClient } from '../server';

export async function uploadAvatar({ image, userId }: any) {
  const supabase = createClient();
  const { data: user, error: getUserError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (user[0]?.avatar_url === '') {
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${user?.id}-${Math.random()}.${fileExt}`;
    const { error, data } = await supabase.storage
      .from('avatars')
      .upload(filePath, image);
    if (!error) {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.path })
        .eq('id', userId);
      console.log('updated', userData);
      if (userError) {
        console.log('failed to update user');
      }
    }
  } else {
    const { error, data } = await supabase.storage
      .from('avatars')
      .update(user[0]?.avatar_url, image);
    if (!error) {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.path })
        .eq('id', userId);
      console.log('updated', userData);
      if (userError) {
        console.log('failed to update user');
      }
    }
  }
  if (getUserError) {
    console.log('failed to get user', getUserError);
  }
}
