import { Container, Flex, Spacer, Text, Center, Grid, GridItem, Stack, Heading, Button, Box, Icon, useColorModeValue, createIcon } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (      
  <Container maxW={'3xl'}>
  <Stack
    as={Box}
    textAlign={'center'}
    spacing={{ base: 8, md: 14 }}
    py={{ base: 20, md: 36 }}>
    <Heading
      fontWeight={600}
      fontSize={{ base: '4xl', sm: '4xl', md: '6xl' }}
      lineHeight={'110%'}>
      StudentSalary <br />
      <Text as={'span'} color={'blue.400'} fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}>
        学生エンジニアの情報サイト
      </Text>
    </Heading>
    <Text color={'gray.500'} >
      このwebサイトは日本の学生エンジニアから匿名であつめられた給与情報、インターンのクチコミを掲載しています。
    </Text>
    <Stack
      direction={'column'}
      spacing={3}
      align={'center'}
      alignSelf={'center'}
      position={'relative'}>
      <Button
        colorScheme={'blue'}
        bg={'blue.400'}
        rounded={'full'}
        px={6}
        _hover={{
          bg: 'blue.500',
        }}>
        時給を登録する
      </Button>
      <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
        Learn more
      </Button>
    </Stack>
  </Stack>
</Container>
  )
}
