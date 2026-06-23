// deepseek api keys(deepseek钥匙，保存):sk-c30f207a7ed242649933322c5ca19fae
// api/deepseek-proxy.js (CommonJS version)
module.exports = async function handler(req, res) {
  console.log('Function called, method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    console.log('Messages received:', messages?.length);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    console.log('DeepSeek status:', response.status);

    if (!response.ok) {
      console.error('DeepSeek error:', JSON.stringify(data));
      return res.status(500).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: error.message });
  }
};